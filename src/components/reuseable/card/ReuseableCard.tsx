import { Card, CardContent } from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ReusableCardProps = {
  title: string;
  type: string;
  to: string;
  count: number;          
  description?: string;
  className?: string;
};

export function ReusableCard({
  title,
  type,
  to,
  count,
  description,
  className = "",
}: ReusableCardProps) {
  const navigate = useNavigate();

  return (
    <Card className={`w-full max-w-2xl bg-white rounded-3xl ${className}`}>
      <CardContent className="p-2 space-y-4">
        <div>
          <div className="flex items-center justify-between gap-4 mx-4">
            <CircleUser size={40} className="text-[#638763]" />

            <div className="flex flex-col items-end">
              <h1 className="text-[#638763] text-xs font-medium">{title}</h1>

              <p className="text-[#638763] text-2xl font-semibold">
                {count}
              </p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex justify-between items-center">
            {/* example growth text—keep/remove as you wish */}
            {/* <p className="mx-4">
              <span className="text-green-600">+55%</span> than last month
            </p> */}

            {/* analytics here */}
            <p></p>

            <Button
              className="bg-white mr-3 text-[#638763] border border-[#638763] hover:bg-[#638763] hover:text-white cursor-pointer"
              onClick={() => navigate(to)}
            >
              {type}
            </Button>
          </div>

          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
