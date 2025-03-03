import { Grid, Card, Text, Group, Button, Title } from '@mantine/core';
import Link from 'next/link';
import { getUsers } from '../../lib/actions';
import Header from '../../components/header';

export default async function EmployeePage({
  searchParams,
}: {
  searchParams: { cursor?: string };
}) {
  const cursor = searchParams.cursor ? parseInt(searchParams.cursor) : undefined;
  const { users: userList } = await getUsers(cursor, 10);
  const nextCursor = userList.length > 0 ? userList[userList.length - 1]?.id : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Group justify="space-between" mb="xl">
          <Title order={2} className="text-gray-800">User List</Title>
        </Group>

        <Grid gutter="md">
          {userList.map((user) => (
            <Grid.Col key={user.id} span={{ base: 12, sm: 6, lg: 4 }}>
              <Card withBorder shadow="sm" padding="lg" radius="md">
                <Group justify="space-between" mb="xs">
                  <Text fw={500}>{user.name}</Text>
                </Group>
                <Text size="sm" c="dimmed">{user.email}</Text>
                <Group justify="space-between" mt="md">
                  <Text size="sm" c="gray.6">Joined: {new Date(user.createdAt).toLocaleDateString()}</Text>
                </Group>
              </Card>
            </Grid.Col>
          ))}
        </Grid>

        {nextCursor && (
          <div className="mt-8 flex justify-center">
            <Button
              component={Link}
              href={`/employees?cursor=${nextCursor}`}
              color="pink"
              radius="md"
              size="md"
              className="hover:bg-pink-600 transition-colors"
            >
              Load More Users
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}