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
      });

    if (error) {
      throw error;
    }

    return data?.path;
  }

  static getUrl = (filePath: string) => {
    const { data } = supabase.storage.from("recordings").getPublicUrl(filePath);
    // console.log(data.publicUrl);
    return data.publicUrl;
  };
}

export default Storage;
