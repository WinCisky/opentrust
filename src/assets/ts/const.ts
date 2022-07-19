export interface ServerResponse {
  success: boolean;
  message: string;
}

export interface Orders {
  id: string,
  email: string,
  created_at: string,
  order_data: JSON | null,
  user_id: string,
  sent: boolean
}

export interface Reviews {
  id: string,
  created_at: string,
  user_id: string,
  order_id: string,
  name: string,
  title: string,
  description: string,
  score: number
}

export class Const {
  static readonly urlSupabase =
    "https://gjclmptpvaepykpghadl.supabase.co";
  static readonly urlRegitration =
    "https://gjclmptpvaepykpghadl.functions.supabase.co/opentrust/userRegistration";
  static readonly urlLogin =
    "https://gjclmptpvaepykpghadl.functions.supabase.co/opentrust/userLogin";
  static readonly anonBearer =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdqY2xtcHRwdmFlcHlrcGdoYWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NTY3OTQ4OTksImV4cCI6MTk3MjM3MDg5OX0.n-WN4gsTP7HgmXjnupOtu-j0fj2hIiACEhy3NagJZt4";

  static readonly urlAuthPwd =
    "https://gjclmptpvaepykpghadl.supabase.co/auth/v1/token?grant_type=password";
}
