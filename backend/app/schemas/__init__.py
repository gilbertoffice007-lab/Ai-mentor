from app.schemas.user import (
    UserProfileSchema, RIASECScoreSchema, CareerRecommendationSchema,
    PersonalityResultSchema, NotificationSchema, LoginRequest, RegisterRequest, UpdateProfileRequest
)
from app.schemas.personality import (
    RIASECQuestionSchema, RIASECOptionSchema, AssessmentAnswer, CompleteAssessmentRequest
)
from app.schemas.domain_career import (
    CareerPathSchema, DomainCategorySchema, CareerSelectRequest
)
from app.schemas.roadmap import (
    RoadmapStageSchema, RoadmapSkillSchema, RoadmapTaskItemSchema, RoadmapResponseSchema
)
from app.schemas.daily_task import (
    DailyTaskSchema, DailyTasksResponse, RescheduleRequest
)
from app.schemas.project import (
    ProjectItemSchema, ProjectMilestoneSchema
)
from app.schemas.resume import (
    ResumeDataSchema, ResumePersonalInfoSchema, ResumeEducationSchema,
    ResumeSkillCategorySchema, ResumeExperienceSchema, ResumeProjectSchema,
    ResumeCertificationSchema
)
from app.schemas.dev_profile import (
    DeveloperProfileSchema, BadgeSchema, TopSkillSchema, ActivityHeatmapSchema, DeveloperStatsSchema
)
from app.schemas.opportunities import (
    InternshipItemSchema, JobListingSchema
)
from app.schemas.placement import (
    PlacementQuestionSchema, CodeSubmitRequest, CodeEvaluationResult
)
from app.schemas.mentor import (
    MentorChatRequest, MentorChatResponse, ResumeReviewRequest, ResumeReviewResponse
)
