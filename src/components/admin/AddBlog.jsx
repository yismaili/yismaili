import { useState, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useForm } from "react-hook-form";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { set, ref as dbRef } from "firebase/database";
import { storage, database } from "../config/firebase";

const slugify = (title) => {
  return title
    .toLowerCase()
    .replace(/ /g, "-") // Replace spaces with hyphens
    .replace(/[^a-z0-9-]/g, ""); // Remove non-alphanumeric characters
};

export default function AddBlog() {
  const [editorContent, setEditorContent] = useState(
    "<p>Your blog is here.</p>"
  );
  const {
    handleSubmit,
    formState: { errors },
    register,
  } = useForm();
  const editorRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image

  const onSubmit = async (data) => {
    // Upload the image to Firebase Storage
    const wordcount = editorContent.split(" ").length;
    const timeread = Math.ceil(wordcount / 200);
    if (selectedImage) {
      const storageRef = ref(storage, "images/" + selectedImage.name);
      await uploadBytes(storageRef, selectedImage);
      let imageUrl = "";
      await getDownloadURL(storageRef)
        .then((url) => (imageUrl = url))
        .catch((error) => console.log(error));
      data.imageURL = imageUrl;
    }
    const slug = slugify(data.title);
    data.content = editorContent;
    // Store the data in the Realtime Database with the custom slug as the ID
    const blogRef = dbRef(database, `blogs/${slug}`);
    set(blogRef, {
      title: data.title,
      description: data.description,
      content: data.content,
      imageURL: data.imageURL || "",
      createdAt: new Date().toISOString(),
      writtenBy: "younes ismaili",
      timeToRead: timeread,
      likeCount: 0,
    });
    // Handle any additional actions, such as navigation or showing a success message.
    console.log("Blog post stored with custom slug:", slug);
  };

  const handleImageChange = (e) => {
    // Handle file change and set the selected image in state

    const file = e.target.files[0];
    setSelectedImage(file);
  };

  return (
    <div className="w-full h-full">
      <form className="w-full h-full flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="form w-[80%] h-full">
          <Editor
            apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
            onInit={(evt, editor) => (editorRef.current = editor)}
            {...register("content")}
            initialValue="<p>Your blog is here.</p>"
            onEditorChange={(content) => setEditorContent(content)}
            init={{
              height: "100%",
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
                "codesample",
              ],
              menubar: "file edit insert view format table tools help",
              codesample_languages: [
                { text: "HTML/XML", value: "markup" },
                { text: "JavaScript", value: "javascript" },
                { text: "CSS", value: "css" },
                { text: "PHP", value: "php" },
                { text: "Ruby", value: "ruby" },
                { text: "Python", value: "python" },
                { text: "Java", value: "java" },
                { text: "C", value: "c" },
                { text: "C#", value: "csharp" },
                { text: "C++", value: "cpp" },
                { text: "Bash", value: "bash" },
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help | file | insert",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="sidepanel w-[20%] bg-slate-50 p-4 flex flex-col justify-between h-full">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              {...register("title")}
              className="border-[1px] px-4 py-2 rounded-md w-full outline-slate-500"
              placeholder="Title"
            />
            <textarea
              type="text"
              rows={3}
              name="description"
              {...register("description")}
              aria-invalid={errors.description ? "true" : "false"}
              className="border-[1px] px-4 py-2 rounded-md w-full outline-slate-500"
              placeholder="Description"
            />
            <div className="mb-4">
              {/* Hidden input for file upload */}
              <input
                type="file"
                id="imageInput"
                {...register("image")}
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <label htmlFor="imageInput">
                <img
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : "https://via.placeholder.com/500"
                  }
                  alt="Selected"
                  className="mt-2 rounded-md border-dashed border-[1px] border-slate-500"
                  style={{ maxWidth: "100%" }}
                />
              </label>
            </div>
          </div>
          <div className="w-full">
            <button
              type="submit"
              className="w-full bg-slate-300 py-2 rounded-md"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
