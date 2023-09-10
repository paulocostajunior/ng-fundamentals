import { FormControl, ValidationErrors } from "@angular/forms";

export function restrictedWords(words: string[]) {
    return (control: FormControl): ValidationErrors | null=> {
        const value = control.value as string;

        if (!value) {
            return null;
        }

        const invalidWords = words
        .map(w => control.value.includes(w) ? w: null )
        .filter(w => w != null)

        if (invalidWords && invalidWords.length > 0) {
            return { 'restrictedWords': invalidWords.join(', ') };
        }

        return null;
    };
}