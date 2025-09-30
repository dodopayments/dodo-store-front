import { locales } from "@/i18n/config";
import { getUserLocale, setUserLocale } from "@/lib/i18n-helper";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function LocaleSwitcher() {
  const currentLocale = await getUserLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {currentLocale.toUpperCase()}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel>Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((loc) => (
          <form key={loc} action={setUserLocale.bind(null, loc)}>
            <DropdownMenuItem asChild>
              <button
                type="submit"
                className={
                  currentLocale === loc ? "font-semibold text-text-primary" : undefined
                }
              >
                {loc.toUpperCase()}
              </button>
            </DropdownMenuItem>
          </form>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}


