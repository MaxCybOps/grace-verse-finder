import { useBibleVersions, BibleVersion } from "@/hooks/useBibleApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

interface VersionSelectorProps {
  selectedVersion: string | null;
  onSelectVersion: (version: BibleVersion) => void;
}

export function VersionSelector({ selectedVersion, onSelectVersion }: VersionSelectorProps) {
  const { versions, loading, error } = useBibleVersions();

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm">Loading versions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-destructive">
        Failed to load versions
      </div>
    );
  }

  const selectedVersionData = versions.find(v => v.id === selectedVersion);

  return (
    <Select
      value={selectedVersion || undefined}
      onValueChange={(value) => {
        const version = versions.find(v => v.id === value);
        if (version) onSelectVersion(version);
      }}
    >
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select version">
          {selectedVersionData?.abbreviationLocal || selectedVersionData?.abbreviation || "Select version"}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {versions.map((version) => (
          <SelectItem key={version.id} value={version.id}>
            <div className="flex flex-col">
              <span className="font-medium">{version.abbreviationLocal || version.abbreviation}</span>
              <span className="text-xs text-muted-foreground truncate max-w-[180px]">
                {version.name}
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
