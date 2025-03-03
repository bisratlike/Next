"use client";

import { Badge, Button, Text, Group } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

export default function Header({ onAddClick }: { onAddClick: () => void }) {
  return (
    <div className="w-full bg-white shadow-sm">
      <div className="max-w-6xl mx-auto p-8">
        <Group justify="space-between">
          <Group gap="sm">
            <Badge
              size="xl"
              radius="sm"
              classNames={{ root: "bg-pink-200", label: "text-pink-800" }}
            >
              Pinky
            </Badge>
            <Text component="h1" className="text-2xl font-bold text-pink-800">
              User Management
            </Text>
          </Group>
          <Button
            leftSection={<IconUserPlus size={20} />}
            color="pink"
            onClick={onAddClick}
          >
            Add New User
          </Button>
        </Group>
      </div>
    </div>
  );
}