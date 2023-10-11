const fetchWithRetry = require('./fetchWithRetry')
const fetchAllSubjects = require('./subjects')

async function workflowID(subjectSetID) {
  console.log(`/subject_sets/${subjectSetID}`)
  const { subject_sets } = await fetchWithRetry(`/subject_sets/${subjectSetID}`)
  console.log(subject_sets)
  const [subjectSet] = subject_sets
  return subjectSet
}

async function fetchSubjectSets() {
  const subjects = await fetchAllSubjects
  const subjectSets = subjects.map(s => s.links.subject_sets[0]).filter(Boolean)
  const uniqueSubjectSets = [...new Set(subjectSets)]
  return await Promise.all(uniqueSubjectSets.map(workflowID))
}

module.exports = fetchSubjectSets()
