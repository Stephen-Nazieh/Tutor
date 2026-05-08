import { query } from '../adapters/db/drizzle.js';
export async function getCurriculum(subject) {
    const curriculum = await query(`SELECT id, subject, name FROM "Curriculum"
     WHERE subject = $1 AND "isPublished" = true
     ORDER BY "updatedAt" DESC
     LIMIT 1`, [subject]);
    if (!curriculum[0])
        return null;
    const modules = await query(`SELECT id, title, description, "order" FROM "CurriculumModule"
     WHERE "curriculumId" = $1
     ORDER BY "order" ASC`, [curriculum[0].id]);
    const lessons = await query(`SELECT id, "moduleId", title, description, duration, difficulty, "order"
     FROM "CurriculumLesson"
     WHERE "moduleId" = ANY($1::text[])
     ORDER BY "order" ASC`, [modules.map((m) => m.id)]);
    return {
        ...curriculum[0],
        modules,
        lessons,
    };
}
