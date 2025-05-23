import { supabase } from "./index";

class Storage {
  // Upload a recording to Supabase Storage and return the public URL
  static async uploadRecording(
    blob: Blob,
    filename: string,
    sessionId: string
  ) {
    const { data, error } = await supabase.storage
      .from("recordings")
      .upload(`${sessionId}/${filename}`, blob, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    return data?.fullPath;
  }
}

export default Storage;
