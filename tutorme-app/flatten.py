import re
import sys

def main():
    file_path = 'tutorme-app/src/app/[locale]/tutor/dashboard/components/CourseBuilder.tsx'
    with open(file_path, 'r') as f:
        content = f.read()

    # Rename types
    content = content.replace('ModuleQuiz', 'CourseBuilderNodeQuiz')
    content = content.replace('Module', 'CourseBuilderNode')
    
    # Rename variables and state
    content = content.replace('modules, setModules', 'nodes, setNodes')
    content = content.replace('modules', 'nodes')
    content = content.replace('initialModules', 'initialNodes')
    content = content.replace('moduleIndex', 'nodeIndex')
    content = content.replace('activeModuleIndex', 'activeNodeIndex')
    content = content.replace('addModule', 'addNode')
    content = content.replace('module.', 'node.')
    content = content.replace('newModule', 'newNode')
    content = content.replace('moduleId', 'nodeId')
    content = content.replace('moduleIdx', 'nodeIdx')
    content = content.replace('mIdx', 'nIdx')
    content = content.replace('DEFAULT_MODULE', 'DEFAULT_NODE')
    
    # In CourseBuilder.tsx, we need to adapt initialLessons to initialNodes
    # Currently it probably takes initialNodes from props.
    # Let's fix that manually.
    
    with open(file_path, 'w') as f:
        f.write(content)

if __name__ == '__main__':
    main()
