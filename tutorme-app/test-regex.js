const url1 = "http://localhost:3000/api/tutor/courses/cm38dn/sessions?status=scheduled,active";
const url2 = "/api/student/courses/123-abc/sessions";
const url3 = "http://localhost:3000/en/api/tutor/courses/cm38dn/sessions?status=scheduled,active";

const match1 = url1.match(/\/courses\/([^/]+)\/sessions/);
const match2 = url2.match(/\/courses\/([^/]+)\/sessions/);
const match3 = url3.match(/\/courses\/([^/]+)\/sessions/);

console.log(match1[1]);
console.log(match2[1]);
console.log(match3[1]);
