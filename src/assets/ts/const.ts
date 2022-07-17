export interface ServerResponse {
  success: boolean;
  message: string;
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
