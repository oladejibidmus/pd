"use client"

import { useState } from "react"
import { Monitor, Moon, Sun, Download, Upload, Trash2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export function SettingsPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    theme: "system",
    defaultView: "grid",
    itemsPerPage: 12,
    showDescriptions: true,
    autoBackup: false,
  })

  const handleExportData = () => {
    // In a real app, this would export actual data
    const sampleData = {
      prompts: [],
      categories: [],
      exportDate: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(sampleData, null, 2)], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "prompt-directory-backup.json"
    a.click()
    URL.revokeObjectURL(url)

    toast({
      title: "Data exported",
      description: "Your data has been exported successfully.",
    })
  }

  const handleImportData = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.accept = ".json"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target?.result as string)
            // In a real app, this would import actual data
            toast({
              title: "Data imported",
              description: "Your data has been imported successfully.",
            })
          } catch (error) {
            toast({
              title: "Import failed",
              description: "Please check your file format.",
              variant: "destructive",
            })
          }
        }
        reader.readAsText(file)
      }
    }
    input.click()
  }

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all data? This action cannot be undone.")) {
      // In a real app, this would clear actual data
      toast({
        title: "Data cleared",
        description: "All your data has been cleared.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Customize your Prompt Directory experience</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the application looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="theme">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred color scheme</p>
              </div>
              <Select
                value={settings.theme}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, theme: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center gap-2">
                      <Sun className="h-4 w-4 text-orange-700" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center gap-2">
                      <Moon className="h-4 w-4 text-orange-700" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center gap-2">
                      <Monitor className="h-4 w-4 text-orange-700" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="defaultView">Default View</Label>
                <p className="text-sm text-muted-foreground">How items are displayed by default</p>
              </div>
              <Select
                value={settings.defaultView}
                onValueChange={(value) => setSettings((prev) => ({ ...prev, defaultView: value }))}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="grid">Grid View</SelectItem>
                  <SelectItem value="list">List View</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label>Show Descriptions</Label>
                <p className="text-sm text-muted-foreground">Display item descriptions in gallery view</p>
              </div>
              <Switch
                checked={settings.showDescriptions}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, showDescriptions: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle>Data Management</CardTitle>
            <CardDescription>Import, export, and manage your data</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Backup</Label>
                <p className="text-sm text-muted-foreground">Automatically backup your data daily</p>
              </div>
              <Switch
                checked={settings.autoBackup}
                onCheckedChange={(checked) => setSettings((prev) => ({ ...prev, autoBackup: checked }))}
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <Label>Data Operations</Label>
              <div className="flex gap-3">
                <Button variant="outline" onClick={handleExportData}>
                  <Download className="h-4 w-4 mr-2 text-orange-700" />
                  Export Data
                </Button>
                <Button variant="outline" onClick={handleImportData}>
                  <Upload className="h-4 w-4 mr-2 text-orange-700" />
                  Import Data
                </Button>
                <Button variant="destructive" onClick={handleClearData}>
                  <Trash2 className="h-4 w-4 mr-2 text-orange-700" />
                  Clear All Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* About */}
        <Card>
          <CardHeader>
            <CardTitle>About</CardTitle>
            <CardDescription>Information about Prompt Directory</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm">
                <strong>Version:</strong> 1.0.0
              </p>
              <p className="text-sm">
                <strong>Last Updated:</strong> January 2024
              </p>
              <p className="text-sm text-muted-foreground">
                Prompt Directory helps developers organize and manage their prompts, commands, and code snippets
                efficiently.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
