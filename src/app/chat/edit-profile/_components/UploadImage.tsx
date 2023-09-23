import Image from "next/image";

import { CldUploadWidget } from "next-cloudinary";

import { IconButton, Tooltip } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

type UploadImageProps = {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string;
};

const styleOptions = {
  palette: {
    window: "#FFFFFF",
    windowBorder: "#90A0B3",
    tabIcon: "#000000",
    menuIcons: "#0A0A0A",
    textDark: "#0E0E0E",
    textLight: "#FFFFFF",
    link: "#000000",
    action: "#FF620C",
    inactiveTabIcon: "#0E2F5A",
    error: "#F44235",
    inProgress: "#0078FF",
    complete: "#20B832",
    sourceBg: "#D8D8D8",
  },
};

function UploadImage({ disabled, onChange, value }: UploadImageProps) {
  return (
    <CldUploadWidget
      onUpload={(result: any) => onChange(result.info.secure_url)}
      uploadPreset="fss0pkwb"
      options={{
        showAdvancedOptions: false,
        sources: ["local", "camera"],
        resourceType: "image",
        clientAllowedFormats: ["image/png", "image/jpeg"],
        maxFileSize: 3000000,
        multiple: false,
        cropping: true,
        croppingAspectRatio: 1,
        showSkipCropButton: false,
        croppingCoordinatesMode: "custom",
        croppingShowDimensions: true,
        styles: styleOptions,
        form: "#edit-profile",
        fieldName: "profile-picture",
      }}
    >
      {({ open, isLoading }) => {
        const onClick = () => {
          open();
        };
        return (
          <figure className="relative overflow-hidden w-[200px] h-[200px]">
            <Image
              src={value}
              alt="image"
              fill
              className="object-cover rounded-full"
            />
            <Tooltip
              placement="top"
              title={
                <>
                  <span className="block">
                    حجم عکس نباید بیشتر از 3MB باشد.
                  </span>
                  <span className="block">
                    فقط فرمت های jpg, jpeg و png پشتیبانی میشوند.
                  </span>
                </>
              }
            >
              <IconButton
                type="button"
                disabled={isLoading || disabled}
                onClick={onClick}
                color="primary"
                disableRipple
                className="absolute !rounded-full w-full h-full backdrop-blur-[2px]"
              >
                <CloudUploadIcon sx={{ fontSize: "4rem" }} />
              </IconButton>
            </Tooltip>
          </figure>
        );
      }}
    </CldUploadWidget>
  );
}

export default UploadImage;
