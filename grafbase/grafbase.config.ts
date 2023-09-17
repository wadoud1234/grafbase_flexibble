import { g, auth, config } from '@grafbase/sdk'

const User = g.model("User", {
  name: g.string().length({ min: 5, max: 20 }),
  email: g.string().length({ min: 10, max: 50 }).unique(),
  avatarUrl: g.url(),
  description: g.string(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g.relation(() => Project).list().optional(),
})

const Project = g.model("Project", {
  title: g.string().length({ min: 3 }),
  description: g.string(),
  imageUrl: g.url(),
  liveSiteUrl: g.url().optional(),
  githubUrl: g.url(),
  category: g.string().search(),
  createdBy: g.relation(() => User)
})

export default config({
  schema: g
})
