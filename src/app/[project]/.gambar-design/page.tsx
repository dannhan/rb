"use client";

import * as React from "react";
import { Inbox, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Category {
  id: string;
  name: string;
  description?: string;
}

export default function GambarDesainPage() {
  const [categories, setCategories] = React.useState<Category[]>([
    {
      id: "interior",
      name: "Gambar Interior",
      description: "Interior design drawings and layouts",
    },
    {
      id: "building",
      name: "Gambar Bangunan",
      description: "Building architecture and structural drawings",
    },
  ]);

  const [newCategory, setNewCategory] = React.useState({
    name: "",
    description: "",
  });
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const addCategory = () => {
    if (!newCategory.name.trim()) return;

    setCategories((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        name: newCategory.name,
        description: newCategory.description,
      },
    ]);

    setNewCategory({ name: "", description: "" });
    setIsDialogOpen(false);
  };

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-end">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Category name"
                  value={newCategory.name}
                  onChange={(e) =>
                    setNewCategory((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Category description (optional)"
                  value={newCategory.description}
                  onChange={(e) =>
                    setNewCategory((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={addCategory}>Add Category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      {categories.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-6 text-center">
          <CardHeader>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <Inbox className="h-10 w-10 text-muted-foreground" />
            </div>
            <CardTitle className="text-xl">No categories yet</CardTitle>
            <CardDescription>
              Get started by creating a new category for your design drawings.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="Category name"
                      value={newCategory.name}
                      onChange={(e) =>
                        setNewCategory((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      placeholder="Category description (optional)"
                      value={newCategory.description}
                      onChange={(e) =>
                        setNewCategory((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={addCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="transition-shadow hover:shadow-lg"
            >
              <Link href={`/gambar-desain/${category.id}`}>
                <CardHeader>
                  <CardTitle>{category.name}</CardTitle>
                  {category.description && (
                    <CardDescription>{category.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-lg bg-muted/50" />
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="ml-auto">
                    View Drawings
                  </Button>
                </CardFooter>
              </Link>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
