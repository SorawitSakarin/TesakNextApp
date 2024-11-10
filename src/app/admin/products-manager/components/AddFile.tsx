// import { useEffect, useState } from "react";
// import { env } from "next-runtime-env";
// import { useHttpClient } from "@/utils/hooks/http-hook";

// export default function FileUpload() {
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const [file, setFile] = useState(null);
//   const [lineAccessToken, setLineAccessToken] = useState<string | null>(null);
//   useEffect(() => {
//     const token = localStorage.getItem('userLineToken');
//     setLineAccessToken(token ? JSON.parse(token) : null);
//   }, []);
//   const handleFileChange = (event: any) => {
//     setFile(event.target.files[0]);
//     console.log(event.target.files[0]);
//   };

//   const handleSubmit = async (event: any) => {
//     event.preventDefault();
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("name", "test/image.png"); // Example additional data\
//     //FIXME about target es2015
//     for (let [key, value] of formData.entries()) {
//       console.log(key, value);
//     }
//     //TODO change error about CORS
//     //FIXME about cors
//     // try {
//     //   const responseData = await sendRequest(
//     //     import.meta.env.VITE_APP_BACKEND_URL + "/files",
//     //     "POST",
//     //     formData,
//     //     {
//     //       Authorization: `Bearer ${lineAccessToken}`,
//     //     }
//     //   );
//     // } catch (err) {
//     //   console.log(err);
//     // }

//     try {
//       const api = env('NEXT_PUBLIC_API_URL')
//       const response = await fetch(
//         api + "/v1/files/file",
//         {
//           method: "POST",
//           body: formData,
//           headers: {
//             Authorization: `Bearer ${lineAccessToken}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("File uploaded successfully:", data);
//       } else {
//         console.error("File upload failed");
//         console.log("error", response);
//       }
//     } catch (error) {
//       console.error("Error uploading file:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" onChange={handleFileChange} />
//       <button type="submit">Upload File</button>
//     </form>
//   );
// }
