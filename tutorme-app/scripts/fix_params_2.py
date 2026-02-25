import os
import re

for root, dirs, files in os.walk('src/app/api'):
    for name in files:
        if name.endswith('.ts') or name.endswith('.tsx'):
            path = os.path.join(root, name)
            with open(path, 'r') as f:
                content = f.read()
            
            # This regex looks for { params }: { params: Promise<{ ... }> } and replaces with context: any
            new_content = re.sub(
                r'\{\s*params\s*\}\s*:\s*\{\s*params\s*:\s*Promise\s*<\s*\{\s*\w+\s*:\s*string\s*\}\s*>\s*\}',
                r'context: any',
                content
            )

            if new_content != content:
                # also need to add `const params = await context?.params;\n` at the start of the function, before `const { id } = await params`
                # Instead of a complex regex, we can just replace `const { \w+ } = await params` with `const params = await context?.params;\n  const { \1 } = params || {};`
                # Let's do a second pass for `await params`
                pass2 = re.sub(
                    r'(const\s+\{\s*(\w+)\s*\}\s*=\s*await\s+params)',
                    r'const params = await context?.params;\n  const { \2 } = params || {};',
                    new_content
                )
                
                # For endpoints that had params without `await`, like maybe they still use `await params` somewhere
                with open(path, 'w') as f:
                    f.write(pass2)
                print(f"Fixed {path}")

# Second script logic for any `{ params }` from previous that I missed
for root, dirs, files in os.walk('src/app/api'):
    for name in files:
        if name.endswith('.ts') or name.endswith('.tsx'):
            path = os.path.join(root, name)
            with open(path, 'r') as f:
                content = f.read()

            # Handle withAuth(async (req, session, { params }) => { ... const { id } = await params }
            pass3 = re.sub(
                r'withAuth\(\s*async\s*\(\s*(req[\w\s:]*?),\s*session\s*,\s*\{\s*params\s*\}\s*\)\s*=>\s*\{',
                r'withAuth(async (\1, session, context: any) => {\n  const params = await context?.params;',
                content
            )
            
            if pass3 != content:
                with open(path, 'w') as f:
                    f.write(pass3)
                print(f"Fixed {path} (pass 3)")
