import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Kanban = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
      <Card className="w-full max-w-xl">
        <CardHeader>
          <CardTitle>Kanban Board</CardTitle>
          <CardDescription>
            Your board dashboard is ready to be connected to the project data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            This route is now wired through the shadcn-based app shell and is ready for your kanban flow.
          </p>
          <Button onClick={() => navigate("/login")} variant="outline">
            Back to Login
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Kanban;
