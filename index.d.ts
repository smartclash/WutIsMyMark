interface Subject extends Object {
    sno: string;
    name: string;
    marks: string[];
}

interface SemesterMarkSheet extends Object {
    semester: string;
    headings: string[];
    subjects: Subject[];
}

/**
 * Scraps data off the website and returns an array
 * 
 * @param username The anna university number of the student
 * @param password The date of birth of the student
 * @param semester Number of the semester you want to get grades.
 */
interface Scrapper {
    (
        username: string,
        password: string,
        semester: number
    ): Promise<SemesterMarkSheet>
}
