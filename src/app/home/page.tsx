import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/blocks/header";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header>
        <h1 className="w-full text-lg font-semibold md:text-xl">Ria Busana</h1>
      </Header>
      <main className="flex flex-1 flex-col items-center gap-4 p-4 md:p-8">
        <h2 className="w-full max-w-screen-xl text-xl font-semibold">
          Konstruksi
        </h2>
        <div className="grid w-full max-w-screen-xl gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          {[1].map((i) => (
            <Link key={i} href="/banjar/tim-pelaksana" className="rounded-lg">
              <Card className="h-48 hover:bg-muted/25">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0">
                  <CardTitle className="text-xl font-medium">
                    Ria Busana Banjar
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-muted-foreground">
                    {/* pemilihan-omega */}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <Separator className="my-4 w-full max-w-screen-xl" />
      </main>
    </div>
  );
}
