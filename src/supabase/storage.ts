import { supabase } from "./index";

class Storage {
  // Upload a recording to Supabase Storage and return the public URL
  static async uploadRecording(file: File) {
    const { data, error } = await supabase.storage
      .from("recordings")
      .upload(`recordings/${file.name}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw new Error(error.message);
    }

    return data?.fullPath;
  }
}
