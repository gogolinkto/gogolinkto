
export {};
declare global {
    export namespace inertia {
        export interface Props {
            user: {
                id: number;
                name: string;
                email: string;
                profile_photo_url: string;
                current_team_id: number;
                created_at: Date;
                updated_at: Date;
            };
            jetstream: {
                [key: string]: boolean;
            };
            errorBags: unknown;
            errors: unknown;
            notifications: any[];
            routeName: string;
        }
    }
}
