import { useContext, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../../../components/ui/button";
import { LayoutGrid } from "lucide-react";
import { ResumeInfoContext } from "../../../context/ResumeInfoContext";
import API from "../../../../services/API.js"
import { useAuth } from "@clerk/clerk-react"

export default function ThemeColor() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [selectedColor, setSelectedColor] = useState(resumeInfo?.themeColor);
  const colors = [
    "#FF5733",
    "#FF6F61",
    "#FFB347",
    "#FFD700",
    "#FFFACD",
    "#ADFF2F",
    "#7FFF00",
    "#32CD32",
    "#20B2AA",
    "#00CED1",
    "#1E90FF",
    "#4169E1",
    "#6A5ACD",
    "#8A2BE2",
    "#BA55D3",
    "#FF69B4",
    "#FF1493",
    "#C71585",
    "#8B0000",
    "#A0522D",
    "#D2691E",
    "#708090",
    "#2F4F4F",
    "#000000",
    "#FFFFFF",
  ];
  const { getToken } = useAuth();

  const onColorSelect = (color)=>{
    setSelectedColor(color)
    setResumeInfo({
        ...resumeInfo,
        themeColor:color
    });
    const data = {
      data: {
        themeColor: color
      }
    }

    API.UpdateResumeDetail(resumeInfo?._id, data, getToken);
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2">
          <LayoutGrid />
          Theme
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <h2 className="mb-2 text-sm font-bold">Select Theme Color</h2>
        <div className="grid grid-cols-5 gap-3">
          {colors.map((item, index) => (
            <div
              key={index}
              onClick={()=>onColorSelect(item)}
              className={`h-5 w-5 rounded-full cursor-pointer hover:border-black border
                ${selectedColor === item && "border-black border"}
              `}
              style={{
                background: item,
              }}
            ></div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
