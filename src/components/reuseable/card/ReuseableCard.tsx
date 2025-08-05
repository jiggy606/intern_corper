import { Card, CardContent } from "@/components/ui/card";
import { CircleUser } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

type ReusableCardProps = {
  title: string;
  type?: string;
  to?: string;
  count: number;
  total?: number;
  description?: string;
  className?: string;
};

export function ReusableCard({
  title,
  type,
  to,
  count,
  total,
  description,
  className = "",
}: ReusableCardProps) {
  const navigate = useNavigate();

  return (
    <Card className={`w-full max-w-2xl bg-white rounded-3xl ${className}`}>
      <CardContent className="p-4 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CircleUser size={40} className="text-[#638763] shrink-0" />

          <div className="flex flex-col text-right sm:text-end">
            <h1 className="text-[#638763] text-sm sm:text-xs font-medium">{title}</h1>
            <p className="text-[#638763] text-3xl sm:text-2xl font-semibold">{count}</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="text-sm text-muted-foreground">{/* growth or analytics text */}</p>

          {to && (
            <Button
              className="bg-white text-[#638763] border border-[#638763] hover:bg-[#638763] hover:text-white cursor-pointer self-end sm:self-auto"
              onClick={() => navigate(to)}
            >
              {type}
            </Button>
          )}
        </div>

        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}
