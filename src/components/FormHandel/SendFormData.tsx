import { typeObjectAdv } from "@/types";

const SendFormData = (object: typeObjectAdv) => {
    const dt = new FormData();
  
    for (const key in object) {
      if (Array.isArray(object[key])) {
        dt.append(`${key}`, JSON.stringify(object[key]));
      } else {
        dt.append(key, object[key] as string || "");
      }
    }
  
    return dt;
  };
  
  export default SendFormData;
  