#!/usr/bin/env python3
"""
Comprehensive schema migration fix script.
Handles complex TypeScript patterns for ID field renames.
"""

import re
import sys
from pathlib import Path
from typing import List, Tuple

# Define the ID field mappings: (table_name_pattern, old_field, new_field)
ID_MAPPINGS: List[Tuple[str, str, str]] = [
    # User table
    (r'\buser\b', 'id', 'userId'),
    
    # Course/Curriculum tables
    (r'\bcurriculum\b', 'id', 'courseId'),
    (r'\bcourse\b', 'id', 'courseId'),
    
    # Lesson tables
    (r'\bcurriculumLesson\b', 'id', 'lessonId'),
    (r'\bcourseLesson\b', 'id', 'lessonId'),
    
    # Enrollment tables
    (r'\bcurriculumEnrollment\b', 'id', 'enrollmentId'),
    (r'\bcourseEnrollment\b', 'id', 'enrollmentId'),
    
    # Progress tables
    (r'\bcurriculumLessonProgress\b', 'id', 'progressId'),
    (r'\bcourseLessonProgress\b', 'id', 'progressId'),
    (r'\bcontentProgress\b', 'id', 'progressId'),
    
    # Live session tables
    (r'\bliveSession\b', 'id', 'sessionId'),
    (r'\bliveSessionTable\b', 'id', 'sessionId'),
    
    # Clinic tables
    (r'\bclinic\b', 'id', 'clinicId'),
    (r'\bclinicBooking\b', 'id', 'bookingId'),
    
    # Payment tables
    (r'\bpayment\b', 'id', 'paymentId'),
    (r'\bfamilyPayment\b', 'id', 'familyPaymentId'),
    
    # Content tables
    (r'\bcontentItem\b', 'id', 'contentId'),
    
    # Task tables
    (r'\bgeneratedTask\b', 'id', 'taskId'),
    (r'\btask\b', 'id', 'taskId'),
    (r'\bbuilderTask\b', 'id', 'taskId'),
    
    # Submission tables
    (r'\btaskSubmission\b', 'id', 'submissionId'),
    
    # Whiteboard tables
    (r'\bwhiteboard\b', 'id', 'whiteboardId'),
    (r'\bwhiteboardPage\b', 'id', 'pageId'),
    (r'\bwhiteboardSnapshot\b', 'id', 'snapshotId'),
    
    # Poll tables
    (r'\bpoll\b', 'id', 'pollId'),
    (r'\bpollResponse\b', 'id', 'responseId'),
    (r'\bpollOption\b', 'id', 'optionId'),
    
    # Session participant
    (r'\bsessionParticipant\b', 'id', 'participantId'),
    
    # Notification tables
    (r'\bfamilyNotification\b', 'id', 'notificationId'),
    (r'\bnotificationPreference\b', 'id', 'preferenceId'),
    
    # Activity log tables
    (r'\bparentActivityLog\b', 'id', 'activityLogId'),
    (r'\buserActivityLog\b', 'id', 'activityLogId'),
    
    # Achievement tables
    (r'\bachievement\b', 'id', 'achievementId'),
    
    # Report tables
    (r'\bpostSessionReport\b', 'id', 'reportId'),
    (r'\bsessionEngagementSummary\b', 'id', 'summaryId'),
    
    # Webhook tables
    (r'\bwebhookEvent\b', 'id', 'eventId'),
    
    # Course batch
    (r'\bcourseBatch\b', 'id', 'batchId'),
    
    # Profile
    (r'\bprofile\b', 'id', 'profileId'),
    
    # Course share
    (r'\bcourseShare\b', 'id', 'shareId'),
    (r'\bcurriculumShare\b', 'id', 'shareId'),
    
    # Conversation/Message
    (r'\bconversation\b', 'id', 'conversationId'),
    (r'\bmessage\b', 'id', 'messageId'),
    
    # Lesson session
    (r'\blessonSession\b', 'id', 'sessionId'),
    
    # AI enrollment
    (r'\baITutorEnrollment\b', 'id', 'enrollmentId'),
    
    # Refund
    (r'\brefund\b', 'id', 'refundId'),
]

# Foreign key mappings: (old_field, new_field)
FK_MAPPINGS = [
    ('curriculumId', 'courseId'),
]

# Removed fields (comment these out or remove references)
REMOVED_FIELDS = [
    'subject',
    'gradeLevel', 
    'difficulty',
    'estimatedHours',
    'duration',
    'learningObjectives',
    'keyConcepts',
    'prerequisiteLessonIds',
    'moduleId',  # from lessons
    'batchId',   # from tasks/enrollments
]

# Table name renames
TABLE_RENAMES = [
    (r'\bcurriculumEnrollment\b', 'courseEnrollment'),
    (r'\bcurriculumLesson\b', 'courseLesson'),
    (r'\bcurriculumLessonProgress\b', 'courseLessonProgress'),
    (r'\bcurriculumProgress\b', 'courseProgress'),
]


def fix_id_fields(content: str) -> str:
    """Fix ID field references."""
    for table_pattern, old_field, new_field in ID_MAPPINGS:
        # Pattern: table.id, table.id}, table.id), etc.
        # But not table.id in comments or strings ideally
        
        # Direct property access: table.id,
        pattern = rf'({table_pattern})\.{old_field}([,}})\.\]])'
        replacement = rf'\1.{new_field}\2'
        content = re.sub(pattern, replacement, content)
        
        # In eq() calls: eq(table.id,
        pattern = rf'eq\(({table_pattern})\.{old_field},'
        replacement = rf'eq(\1.{new_field},'
        content = re.sub(pattern, replacement, content)
        
        # In eq() calls: eq(table.id)
        pattern = rf'eq\(({table_pattern})\.{old_field}\)'
        replacement = rf'eq(\1.{new_field})'
        content = re.sub(pattern, replacement, content)
        
        # In inArray() calls: inArray(table.id,
        pattern = rf'inArray\(({table_pattern})\.{old_field},'
        replacement = rf'inArray(\1.{new_field},'
        content = re.sub(pattern, replacement, content)
        
        # In columns selection: columns: { id: true
        pattern = rf'columns: \{{ {old_field}: true'
        replacement = f'columns: {{ {new_field}: true'
        content = re.sub(pattern, replacement, content)
        
        # In destructuring: { id } = table
        pattern = rf'{{ {old_field} }} = {table_pattern}'
        replacement = rf'{{ {new_field} }} = \1'
        content = re.sub(pattern, replacement, content)
        
        # In object shorthand: { id, email }
        # This is trickier, only replace when context matches
        
    return content


def fix_foreign_keys(content: str) -> str:
    """Fix foreign key field references."""
    for old_field, new_field in FK_MAPPINGS:
        # Property access
        content = re.sub(rf'\.{old_field}([,}})\.\]])', rf'.{new_field}\1', content)
        # In eq() calls
        content = re.sub(rf'eq\((\w+)\.{old_field},', rf'eq(\1.{new_field},', content)
        # Column selection
        content = re.sub(rf'{old_field}:', f'{new_field}:', content)
    return content


def fix_table_names(content: str) -> str:
    """Fix table name references."""
    for old_name, new_name in TABLE_RENAMES:
        content = re.sub(old_name, new_name, content)
    return content


def fix_insert_ids(content: str) -> str:
    """Fix ID fields in insert operations."""
    # Pattern: .values({ id: someId, ... })
    # This needs to be specific to the table being inserted into
    # For now, handle common patterns
    
    # Generic fix: if we see id: crypto.randomUUID() in insert context
    # This is risky and might need manual review
    return content


def process_file(filepath: Path) -> bool:
    """Process a single file. Returns True if changes were made."""
    try:
        content = filepath.read_text(encoding='utf-8')
        original = content
        
        content = fix_table_names(content)
        content = fix_id_fields(content)
        content = fix_foreign_keys(content)
        
        if content != original:
            filepath.write_text(content, encoding='utf-8')
            return True
        return False
    except Exception as e:
        print(f"Error processing {filepath}: {e}")
        return False


def main():
    """Main entry point."""
    if len(sys.argv) > 1:
        target_dir = Path(sys.argv[1])
    else:
        target_dir = Path('src')
    
    if not target_dir.exists():
        print(f"Directory not found: {target_dir}")
        sys.exit(1)
    
    print(f"Scanning {target_dir} for TypeScript files...")
    
    ts_files = list(target_dir.rglob('*.ts'))
    print(f"Found {len(ts_files)} TypeScript files")
    
    modified = 0
    for filepath in ts_files:
        if process_file(filepath):
            modified += 1
            print(f"  Modified: {filepath}")
    
    print(f"\nDone! Modified {modified} files.")
    print("\nIMPORTANT: Review all changes manually before committing!")
    print("Some patterns that need manual review:")
    print("  1. Insert operations: id: -> specificId:")
    print("  2. Type/interface definitions with id fields")
    print("  3. References to removed fields (subject, gradeLevel, difficulty, etc.)")
    print("  4. Complex nested queries with multiple tables")


if __name__ == '__main__':
    main()
