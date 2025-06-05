import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";
import { CircleUser } from 'lucide-react';
import { Separator } from "@/components/ui/separator"

type ReusableCardProps = {
  title: string;
  description?: string;
  
  className?: string;
};

export function ReusableCard({ title, description, className = "" }: ReusableCardProps) {
  return (
    <Card className={`w-full max-w-xl bg-white rounded-3xl ${className}`}>
      <CardContent className="p-2 space-y-4">
        <div className="">
            <div className="flex items-center justify-between gap-4 mx-4">
                <CircleUser size={40} className="text-green-700" />
                
                <div className="flex flex-col items-end">
                    <h1 className="text-green-700 text-xs font-medium">{title}</h1>
                    <p className="text-green-700 text-2xl font-semibold">500</p>
                </div>
            </div>
            <Separator className="my-4" />
            <p className="mx-4"><span className="text-green-400">+55%</span> than last month</p>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </CardContent>
    </Card>
  );
}
