const slugify = require('slugify');
const fetchWithRetry = require('../_data/fetchWithRetry.js');

function subjectTitle({ subject }) {
  return `Subject ${subject.id}`;
}

function subjectLocations({ subject }) {
  return subject.locations.map((loc, index) => ({
    alt: `Page ${index + 1}`,
    src: loc['image/jpeg']
  }))
}

function ogImage({ subject }) {
  const [firstImage] = subject.locations
  return firstImage['image/jpeg']
}

function description({ subject, classifications }) {
  return 'Page description goes here.'
}

async function workflowID({ subject, subjectSets }) {
  const [subjectSetID] = subject.links.subject_sets
  const subjectSet = subjectSets.find(s => s.id == subjectSetID)
  if (subjectSet) {
    const [workflowID] = subjectSet.links.workflows
    return workflowID
  }
  return -1
}

module.exports = {
  eleventyComputed: {
    title: subjectTitle,
    subjectLocations,
    description,
    ogImage,
    workflowID
  }
}