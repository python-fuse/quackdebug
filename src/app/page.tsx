"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Mic,
  Code,
  Headphones,
  Sparkles,
  ArrowRight,
  Github,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between py-4 px-10">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="QuackDebug Logo"
              width={40}
              height={40}
            />
            <span className="text-xl font-bold">QuackDebug</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              How It Works
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:underline underline-offset-4"
            >
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login">
              <Button variant="outline" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-24 space-y-8 md:py-32 lg:space-y-16">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Your Voice-Powered <span className="text-primary">Debugging</span>{" "}
              Companion
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              QuackDebug listens to your debugging process, transcribes your
              thoughts, and helps you solve problems faster.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/auth/signup">
                <Button size="lg" className="gap-2">
                  Get Started <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="https://github.com/yourusername/quackdebug"
                target="_blank"
              >
                <Button variant="outline" size="lg" className="gap-2">
                  <Github className="h-4 w-4" /> GitHub
                </Button>
              </Link>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2">
            <Image
              src="/logo.png"
              alt="QuackDebug in action"
              width={500}
              height={500}
              className="mx-auto rounded-xl shadow-xl"
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold">
                Debug Like You're Talking to a Friend
              </h2>
              <p className="text-muted-foreground">
                Explain your code problems out loud, and QuackDebug will capture
                your thoughts, organize them, and help you track your debugging
                journey.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    ✓
                  </span>
                  <span>Voice-to-text transcription</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    ✓
                  </span>
                  <span>Audio session recording</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary">
                    ✓
                  </span>
                  <span>Organized debugging sessions</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container py-16 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Powerful Features
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Everything you need to streamline your debugging process and solve
              problems faster.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Mic className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Voice Recognition</CardTitle>
                <CardDescription>
                  Speak your thoughts and have them automatically transcribed
                  into text.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our advanced speech recognition technology accurately captures
                  your debugging process as you talk through problems.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Headphones className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Audio Recording</CardTitle>
                <CardDescription>
                  Record your debugging sessions for later review and analysis.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Capture every detail of your debugging process with
                  high-quality audio recordings that sync with your
                  transcriptions.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Code className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Session Management</CardTitle>
                <CardDescription>
                  Organize and manage your debugging sessions efficiently.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Keep track of all your debugging sessions, add notes, and tag
                  important moments for easy reference later.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Sparkles className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Smart Analysis</CardTitle>
                <CardDescription>
                  Get insights from your debugging patterns and habits.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Our intelligent system helps you identify recurring issues and
                  suggests improvements to your debugging approach.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-muted py-16 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                How It Works
              </h2>
              <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                QuackDebug makes debugging easier in just a few simple steps.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-bold mb-2">Start a Session</h3>
                <p className="text-muted-foreground">
                  Create a new debugging session when you encounter a problem in
                  your code.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-bold mb-2">
                  Talk Through Your Problem
                </h3>
                <p className="text-muted-foreground">
                  Explain the issue out loud as if you're talking to a colleague
                  or rubber duck.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-bold mb-2">Review and Solve</h3>
                <p className="text-muted-foreground">
                  Review your transcribed thoughts, add notes, and solve your
                  problem more efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="container py-16 md:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              What Developers Say
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              Hear from developers who have transformed their debugging process
              with QuackDebug.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    JS
                  </div>
                  <div>
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-muted-foreground">
                      Frontend Developer
                    </p>
                  </div>
                </div>
                <p className="italic">
                  "QuackDebug has completely changed how I approach difficult
                  bugs. Talking through problems out loud and having everything
                  recorded has been a game-changer."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    MD
                  </div>
                  <div>
                    <h4 className="font-semibold">Mike Davis</h4>
                    <p className="text-sm text-muted-foreground">
                      Backend Engineer
                    </p>
                  </div>
                </div>
                <p className="italic">
                  "I used to spend hours stuck on the same problem. With
                  QuackDebug, I can verbalize my thoughts and often find the
                  solution just by explaining the problem out loud."
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    AL
                  </div>
                  <div>
                    <h4 className="font-semibold">Alex Lee</h4>
                    <p className="text-sm text-muted-foreground">
                      Full Stack Developer
                    </p>
                  </div>
                </div>
                <p className="italic">
                  "The session management feature is brilliant. I can go back to
                  previous debugging sessions and see exactly how I solved
                  similar problems in the past."
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground py-16 md:py-24">
          <div className="container">
            <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Ready to Debug Smarter?
              </h2>
              <p className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
                Join thousands of developers who have transformed their
                debugging process with QuackDebug.
              </p>
              <Button size="lg" variant="secondary" className="mt-4">
                <Link href="/auth/signup">Get Started for Free</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0 px-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="QuackDebug Logo"
              width={24}
              height={24}
            />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} QuackDebug. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
