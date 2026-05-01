import { useState, useRef, useEffect } from "react";
import "./style.css";
import { ProgressSpinner } from "primereact/progressspinner";
import uploadImage from "@routes/routesCloudinary";

interface PhotoUploadProps {
  imageProfile: string;
  canUpload?: boolean;
  setField?: (field: string, value: unknown) => void;
}

const PhotoUpload = ({
  imageProfile,
  canUpload = false,
  setField,
}: PhotoUploadProps) => {
  const [image, setImage] = useState(imageProfile || "");
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setLoading(true);
      try {
        const imageUrl = await uploadImage(file);

        if (imageUrl) {
          setImage(imageUrl);
          setField && setField("perfil.foto", imageUrl);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    setImage(imageProfile || "");
  }, [imageProfile]);

  return (
    <div
      onClick={() => canUpload && !loading && fileInputRef.current?.click()}
      style={{ cursor: canUpload ? "pointer" : "default" }}
    >
      <div
        className={`${canUpload ? "picture-form" : "profile-picture"} ${
          canUpload && image ? "has-image" : ""
        }`}
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {loading ? (
          <ProgressSpinner className="photo-upload-spinner" />
        ) : (
          canUpload && <i className="pi pi-pencil icon-image" />
        )}
      </div>
      {canUpload && (
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept="image/*"
          onChange={handleImageUpload}
        />
      )}
    </div>
  );
};

export default PhotoUpload;
