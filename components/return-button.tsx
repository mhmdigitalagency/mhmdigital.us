import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Link from "next/link";

interface ReturnButtonProps {
      href: string;
      label: string;
}

const ReturnButton = ({ href, label }: ReturnButtonProps) => {
  return (
      <Link href={href} className="mb-2.5">
            <Button size="lg" className="flex items-center justify-between gap-2 rounded-full cursor-pointer bg-white text-black hover:bg-black/10 transition-all duration-300">
                  <ArrowLeftIcon />
                  {label}
            </Button>
      </Link>
  )
}

export default ReturnButton
