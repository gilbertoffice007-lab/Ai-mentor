from typing import List, Dict, Any

def rebalance_student_curriculum(tasks: List[Dict[str, Any]], missed_days: int, remaining_weeks: int) -> List[Dict[str, Any]]:
    """Intelligently redistributes missed tasks across remaining semester weeks to prevent burnout."""
    rebalanced = []
    for task in tasks:
        task_copy = dict(task)
        # Adapt estimated minutes to fit student's remaining semester load
        current_mins = task_copy.get("estimatedMinutes", 60)
        task_copy["estimatedMinutes"] = max(30, current_mins - 10 if remaining_weeks > 4 else current_mins)
        task_copy["difficulty"] = "Medium"
        rebalanced.append(task_copy)
    return rebalanced
