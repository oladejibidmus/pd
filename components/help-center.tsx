"use client"

import { useState } from "react"
import { Search, BookOpen, Video, MessageCircle, ChevronDown, ChevronRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Badge } from "@/components/ui/badge"

const faqData = [
  {
    question: "How do I add a new prompt or snippet?",
    answer:
      'Click the "Add New" button in the gallery or use the quick add button in the sidebar. Fill in the required fields including title, type, and content.',
    category: "Getting Started",
  },
  {
    question: "Can I organize my items into categories?",
    answer:
      "Yes! You can create custom categories in the Category Management section and assign items to them when adding or editing.",
    category: "Organization",
  },
  {
    question: "How do I copy content to my clipboard?",
    answer: "Click the copy button on any item card or use the copy button in the detailed view modal.",
    category: "Usage",
  },
  {
    question: "Can I search through my saved items?",
    answer: "Use the search bar at the top of the gallery to search through titles, content, and tags.",
    category: "Usage",
  },
  {
    question: "How do I backup my data?",
    answer: 'Go to Settings > Data Management and click "Export Data" to download a JSON backup of all your items.',
    category: "Data Management",
  },
  {
    question: "Can I import data from another tool?",
    answer: "Yes, you can import JSON data through Settings > Data Management > Import Data.",
    category: "Data Management",
  },
]

const tutorials = [
  {
    title: "Getting Started with Prompt Directory",
    description: "Learn the basics of organizing your prompts and snippets",
    duration: "5 min",
    type: "video",
  },
  {
    title: "Advanced Organization Techniques",
    description: "Master categories, tags, and search to boost productivity",
    duration: "8 min",
    type: "video",
  },
  {
    title: "Data Import and Export Guide",
    description: "How to backup and migrate your data effectively",
    duration: "3 min",
    type: "article",
  },
]

export function HelpCenter() {
  const [searchQuery, setSearchQuery] = useState("")
  const [openFaq, setOpenFaq] = useState<string | null>(null)

  const filteredFaq = faqData.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Help & Resources</h1>
        <p className="text-muted-foreground">Find answers, tutorials, and get support</p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-orange-700" />
          <Input
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-8">
        {/* Quick Links */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-orange-700" />
                  <CardTitle className="text-lg">User Guide</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Complete guide to using all features of Prompt Directory</CardDescription>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Video className="h-5 w-5 text-orange-700" />
                  <CardTitle className="text-lg">Video Tutorials</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Step-by-step video guides for common tasks</CardDescription>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-orange-700" />
                  <CardTitle className="text-lg">Contact Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription>Get help from our support team</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tutorials */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Tutorials & Guides</h2>
          <div className="space-y-3">
            {tutorials.map((tutorial, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {tutorial.type === "video" ? (
                        <Video className="h-5 w-5 text-orange-700" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-orange-700" />
                      )}
                      <div>
                        <h3 className="font-medium">{tutorial.title}</h3>
                        <p className="text-sm text-muted-foreground">{tutorial.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{tutorial.duration}</Badge>
                      <ChevronRight className="h-4 w-4 text-orange-700" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {filteredFaq.map((faq, index) => (
              <Collapsible
                key={index}
                open={openFaq === `faq-${index}`}
                onOpenChange={(isOpen) => setOpenFaq(isOpen ? `faq-${index}` : null)}
              >
                <CollapsibleTrigger asChild>
                  <Card className="cursor-pointer hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline" className="text-xs">
                            {faq.category}
                          </Badge>
                          <h3 className="font-medium">{faq.question}</h3>
                        </div>
                        {openFaq === `faq-${index}` ? (
                          <ChevronDown className="h-4 w-4 text-orange-700" />
                        ) : (
                          <ChevronRight className="h-4 w-4 text-orange-700" />
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <Card className="mt-2 border-t-0">
                    <CardContent className="p-4 pt-2">
                      <p className="text-muted-foreground">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </CollapsibleContent>
              </Collapsible>
            ))}
          </div>

          {filteredFaq.length === 0 && searchQuery && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No results found for "{searchQuery}"</p>
              <Button
                variant="outline"
                className="mt-4 bg-transparent border-orange-700 text-orange-700 hover:bg-orange-50"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Contact Support
              </Button>
            </div>
          )}
        </section>

        {/* Contact Support */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Need More Help?</CardTitle>
              <CardDescription>Can't find what you're looking for? Our support team is here to help.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                <Button className="bg-orange-700 hover:bg-orange-800">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                <Button variant="outline">Report a Bug</Button>
                <Button variant="outline">Request Feature</Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
