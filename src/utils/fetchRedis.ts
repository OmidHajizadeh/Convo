const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL as string;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN as string;

type Command = "get" | "zrange" | "sismember" | "smembers" | "hexists" | "hgetall";

export async function fetchRedis<T>(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;

  const response = await fetch(commandUrl, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Redis command failed: ${response.statusText}`);
  }

  const data: {
    result: T
  } = await response.json();

  return data.result;
}
