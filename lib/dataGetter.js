import { useIdeaItemContext } from "../store/ideaItem";
import Ionicons from "@expo/vector-icons/Ionicons";
import { gStyles } from "./globalStyles";

export function useDashboardData() {
  const { idea } = useIdeaItemContext();
  const favorites = idea.filter((ideas) => ideas.favorite === true).length;
  const progress = idea.filter(
    (ideas) => ideas.status === "in-progress"
  ).length;

  const validated = idea.filter((ideas) => ideas.status === "validated").length;
  const dropped = idea.filter((ideas) => ideas.status === "dropped").length;
  const launched = idea.filter((ideas) => ideas.status === "launched").length;

  return [
    {
      name: "Total Ideas",
      data: idea.length,
      icon: (
        <Ionicons name="bulb-outline" size={44} color={gStyles.textPrimary} />
      ),
      color: gStyles.info,
    },
    {
      name: "Favorites",
      data: favorites,
      icon: (
        <Ionicons name="heart-outline" size={44} color={gStyles.textPrimary} />
      ),
      color: gStyles.accent,
    },
    {
      name: "In Progress",
      data: progress,
      icon: (
        <Ionicons
          name="trending-up-outline"
          size={44}
          color={gStyles.textPrimary}
        />
      ),
      color: gStyles.background,
    },
    {
      name: "Validated",
      data: validated,
      icon: (
        <Ionicons
          name="checkmark-done-outline"
          size={44}
          color={gStyles.textPrimary}
        />
      ),
      color: gStyles.textSecondary,
    },
    {
      name: "Dropped",
      data: dropped,
      icon: <Ionicons name="close" size={44} color={gStyles.textPrimary} />,
      color: gStyles.error,
    },
    {
      name: "Launched",
      data: launched,
      icon: (
        <Ionicons name="rocket-outline" size={44} color={gStyles.textPrimary} />
      ),
      color: gStyles.success,
    },
  ];
}
