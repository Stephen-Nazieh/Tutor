import os
import re

for root, dirs, files in os.walk('src/app/api'):
    for name in files:
        if name.endswith('.ts') or name.endswith('.tsx'):
            path = os.path.join(root, name)
            with open(path, 'r') as f:
                content = f.read()

            new_content = re.sub(
                r'withAuth\(\s*async\s*\(\s*(req.*?),\s*session\s*,\s*\{\s*params\s*\}\s*\)\s*=>\s*\{(?!\s*const\s*params\s*=)',
                r'withAuth(async (\1, session, context: any) => {\n  const params = await context?.params;',
                content
            )

            if new_content != content:
                with open(path, 'w') as f:
                    f.write(new_content)
                print(f"Fixed {path}")

