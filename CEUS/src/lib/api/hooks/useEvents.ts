import { useMemo } from "react";

import { api } from "@/trpc/react";
import type { Event } from "../types";

export default function useEvents() {
  const query = api.events.getInfinite.useQuery({});

  const allEvents = useMemo(() => {
    if (!query.data) return undefined;

    const events = query.data.data;

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    console.log('twoYearsAgo:', twoYearsAgo); // Debug

    const upcomingEvents = events.filter((event: Event) => event.upcoming);
    const pastEvents = events.filter((event: Event) => {
      // Extract date part from "Mon, 27 Jul 2026, 5.30 PM" → "27 Jul 2026"
      const dateMatch = event.start_time.match(/(\d{1,2}\s+\w{3}\s+\d{4})/);
      const eventDate = dateMatch ? new Date(dateMatch[1]) : new Date(0);
      return !event.upcoming && eventDate >= twoYearsAgo;
    });

    return { upcomingEvents, pastEvents };
  }, [query.data]);

  return { allEvents, ...query };
}
