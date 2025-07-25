import { Button } from "@/components/ui/button"
import { Heart, X, Send } from "lucide-react"

export default function ActionButtons() {
  return (
    <div className="flex flex-col space-y-3 items-end border-l border-[#757575] w-[268px] px-8">
      <div className="flex gap-6">
        <div className="text-regular text-gray-600 mb-2 font-Lato mt-2">Send Connection</div>
        <Button className="bg-linear-to-r from-[#2BFF88] to-[#2BD2FF] text-white rounded-full w-12 h-12 p-0" size="sm">
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <div className="flex gap-6 items-center">
        <div className="text-regular text-gray-600 mb-2 font-Lato">Shortlist</div>
        <Button
          variant="outline"
          className="border-[#F2F2F2] hover:bg-gray-50 rounded-full w-12 h-12 p-0 bg-transparent"
          size="sm"
        >
          <Heart className="w-4 h-4 text-[#8E2E37]" />
        </Button>
      </div>
      <div className="flex gap-6 items-center">
        <div className="text-regular text-gray-600 font-Lato">Not Now</div>
        <Button
          variant="outline"
          className="bg-[#ADADAD] hover:bg-gray-50 rounded-full w-12 h-12 p-0"
          size="sm"
        >
          <X className="w-4 h-4 text-gray-600" />
        </Button>
      </div>
    </div>
  )
}