import { getPortfolioData } from "@/lib/data";
import HomeClient from "./home-client";

export default async function Page() {
  const data = await getPortfolioData();
  return <HomeClient initialData={data} />;
}
