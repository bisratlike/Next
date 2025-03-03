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
    <TextInput
      placeholder="Search users by name or email..."
      leftSection={<IconSearch size={18} className="text-gray-500" />}
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.currentTarget.value)}
      size="md"
      radius="md"
      className="w-full max-w-2xl"
      classNames={{
        input: "border-gray-200 focus:border-pink-300",
      }}
    />
  );
}