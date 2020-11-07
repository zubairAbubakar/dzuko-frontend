import { FormControl, ValidationErrors } from '@angular/forms';

export class DzukoValidators {

    /**
     * whitespace validator
     * @param control 
     */
    static notOnlyWhitespace(control: FormControl): ValidationErrors {

        //check if the string only contains whitespace
        if((control.value != null) && (control.value.trim().length === 0)){

            //invalid return error object
            return { 'notOnlyWhitespace': true }
        }
        else {

            //valid return null
            return null;
        }

    }
}
