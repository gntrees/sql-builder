import ThemeToggle from "#/components/ThemeToggle"
import { createFileRoute } from "@tanstack/react-router"
import { CodeBlock } from "../components/ai/code-block"
import { Logo } from "../components/logo"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../components/ui/card"
import { SampleCodeBlock } from "#/components/sample-code-block"

export const Route = createFileRoute('/')({ component: HomePage })

const codeSample = `const query = q.select(
  q.c("users.id"),
  q.c("users.name"),
)
  .from(q.t("users"))
  .where(q.c("users.age").op(">=").v(65))
  .orderBy(q.c("users.name"));`

function HomePage() {
	return (
		<div className="min-h-screen bg-background text-foreground flex flex-col justify-between">
			<div className="relative overflow-hidden h-full grow">
				<div className="pointer-events-none absolute inset-0 bg-grid opacity-60" />
				<div className="pointer-events-none absolute left-1/2 top-[-18rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

				<header className="relative mx-auto flex w-full max-w-6xl items-center px-6 py-6 gap-10">
					<Logo />
					<nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
						<a href="/docs" className="transition hover:text-foreground">
							Docs
						</a>
						<a href="/converter" className="transition hover:text-foreground">
							Converter
						</a>
					</nav>
					<div className="flex items-center gap-2 ml-auto">
						<ThemeToggle />
						<Button asChild variant="outline" size="icon">
							<a
								href="https://github.com"
								target="_blank"
								rel="noreferrer"
								aria-label="GitHub"
							>
								<svg
									viewBox="0 0 24 24"
									className="h-5 w-5"
									fill="currentColor"
									aria-hidden="true"
								>
									<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.271.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844a9.58 9.58 0 012.504.336c1.909-1.296 2.748-1.026 2.748-1.026.546 1.379.202 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
								</svg>
							</a>
						</Button>
					</div>
				</header>

				<main className="relative mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-20">
					<section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
						<div className="space-y-6">
							<Badge variant="secondary" className="fade-up">
								SQL builder
							</Badge>
							<div className="space-y-4">
								<h1 className="fade-up delay-1 text-balance text-4xl font-semibold leading-tight sm:text-5xl">
									Simple SQL Builder.
								</h1>
								<p className="fade-up delay-2 max-w-xl text-base text-muted-foreground sm:text-lg">
									Just a simple SQL builder for TypeScript. No more string concatenation or worrying about SQL injection. Can handle complex queries with ease.
								</p>
							</div>
							<div className="fade-up delay-3 flex flex-wrap gap-3">
								<Button asChild size="lg">
									<a href="/docs">Explore docs</a>
								</Button>
								<Button asChild variant="outline" size="lg">
									<a href="/converter">Try converter</a>
								</Button>
							</div>
						</div>

						<Card className="fade-up delay-2 overflow-hidden p-0">
							<SampleCodeBlock />
						</Card>
					</section>
				</main>
			</div>
			<footer className="border-t border-border bg-card">
				<div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
					<span>Gntrees SQL Builder © 2026</span>
					<span>Docs · Converter · GitHub</span>
				</div>
			</footer>
		</div>
	)
}
