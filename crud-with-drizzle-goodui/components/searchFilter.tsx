// components/SearchFilter.tsx
"use client";

import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

export default function SearchFilter({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}) {
  return (
    <div className="max-w-6xl mx-auto px-8 mb-6">
      <TextInput
        placeholder="Search users by name or email..."
        leftSection={<IconSearch size={18} />}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.currentTarget.value)}
        className="w-full"
        size="md"
        radius="lg"
      />
    </div>
  );
}