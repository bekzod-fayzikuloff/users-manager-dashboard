export interface IUser {
    id: string;
    username: string;
    email: string;
    joinDate: Date;
    lastLoginDate: Date;
    isBlocked: boolean;
}

interface FormElements extends HTMLFormControlsCollection {
    value: HTMLInputElement;
}

export interface ISingUpForm extends HTMLFormElement {
    readonly username: FormElements;
    readonly email: FormElements;
    readonly password: FormElements;
}

export type ISingInForm = Omit<ISingUpForm, "username">
