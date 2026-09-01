export interface BaseModel {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface User extends BaseModel {
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar?: string;
}

export interface Login extends BaseModel {
    user_id: number;
    username: string;
    password: string;
    remember_token: string | null;
    user?: User;
}

export interface ActivityLog extends BaseModel {
    log_name: string;
    description: string;
    subject_type: string | null;
    subject_id: string | number | null;
    causer_type: string | null;
    causer_id: string | number | null;
    changes: Record<string, any> | null;
    snapshot: Record<string, any> | null;
    meta: Record<string, any> | null;
    is_critical: boolean;
    properties: Record<string, any> | null;
}

export interface JobBatch extends BaseModel {
    name: string;
    total_jobs: number;
    pending_jobs: number;
    failed_jobs: number;
    processed_jobs: number;
    failed_job_ids: number[];
    options: Record<string, any> | null;
    cancelled_at: string | null;
    finished_at: string | null;
}

export interface YesNoOption {
    id: number;
    value: string;
    label: string;
    sort_order: number;
    is_active: boolean;
}