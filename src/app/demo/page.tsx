import LocaleSwitcher from "@/components/locale-switcher";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            Translation Demo
          </h1>
          <p className="text-lg text-muted-foreground">
            Switch languages using the dropdown below to see translations in action
          </p>
        </div>

        <div className="flex justify-center">
          <LocaleSwitcher />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Sample Content</h2>
            <p className="text-muted-foreground mb-4">
              This page demonstrates the Lingo.dev translation system. 
              Switch between English, German, and Spanish using the dropdown above.
            </p>
            <ul className="space-y-2 text-sm">
              <li>• Automated translation at build time</li>
              <li>• No component changes required</li>
              <li>• Cookie-based locale switching</li>
              <li>• Dynamic HTML lang attribute</li>
            </ul>
          </div>

          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Build-time compilation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Server-side rendering</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Automatic dictionary generation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>UI component integration</span>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Current locale is controlled by the <code className="bg-muted px-2 py-1 rounded">lingo-locale</code> cookie
          </p>
        </div>
      </div>
    </div>
  );
}
