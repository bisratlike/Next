"use client";

import { Badge, Button, Text, Group, Container } from "@mantine/core";
import { IconUserPlus } from "@tabler/icons-react";

export default function Header({ onAddClick = () => {} }: { onAddClick?: () => void }) {
  return (
    <header className="w-full bg-white shadow-sm border-b border-gray-100">
      <Container size="xl" py="md">
        <Group justify="space-between">
          <Group gap="xs">
            <Badge
              size="xl"
              radius="sm"
              variant="filled"
              color="pink"
              className="shadow-md"
            >
              Pinky
            </Badge>
            <Text component="h1" className="text-2xl font-bold text-gray-800">
              User Management
            </Text>
          </Group>
          <Button
            leftSection={<IconUserPlus size={20} />}
            color="pink"
            radius="md"
            size="md"
            onClick={onAddClick}
            className="shadow-sm hover:shadow-md transition-shadow"
          >
            Add New User
          </Button>
        </Group>
      </Container>
    </header>
  );
}