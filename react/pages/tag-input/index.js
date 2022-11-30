import { useState } from 'react';

const Wrapper = ({ children, hasGap }) => (
  <div
    style={{
      padding: '4px',
      border: '1px solid',
      display: 'flex',
      gap: hasGap ? '4px' : 'initial',
      width: 'fit-content',
    }}
  >
    {children}
  </div>
);

const removeTag = (tags, tag) => {
  const { [tag]: _, ...updatedTags } = tags;
  return updatedTags;
};

const Button = ({ tag, setTags }) => (
  <button
    onClick={() => setTags((tags) => removeTag(tags, tag))}
    style={{ marginLeft: '4px' }}
  >
    X
  </button>
);

const getTags = (tags) => Object.values(tags);

const Tag = ({ tag, setTags }) => (
  <span style={{ border: '1px solid', padding: '2px' }}>
    {tag}
    <Button tag={tag} setTags={setTags} />
  </span>
);

const Tags = ({ tags, setTags }) => (
  <div style={{ display: 'flex', gap: '4px' }}>
    {getTags(tags).map((tag) => (
      <Tag tag={tag} setTags={setTags} />
    ))}
  </div>
);

const hasTag = (tags, tag) => (tags[tag.toLowerCase()] ? true : false);

const Input = ({ setTags }) => {
  const [newTag, setNewTag] = useState('');

  const updateTag = (event) => {
    setNewTag(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      setTags((tags) =>
        hasTag(tags, newTag)
          ? tags
          : {
              ...tags,
              [newTag]: newTag,
            }
      );
    }
  };

  return <input onChange={updateTag} onKeyDown={handleEnter}></input>;
};

const isObjEmpty = (object) => Object.keys(object).length === 0;

const TagInput = () => {
  const [tags, setTags] = useState({ aaa: 'aaa', bbb: 'bbb' });
  const isEmpty = isObjEmpty(tags);
  const hasGap = !isEmpty;

  return (
    <Wrapper hasGap={hasGap}>
      <Tags tags={tags} setTags={setTags} />
      <Input setTags={setTags} />
    </Wrapper>
  );
};

const Page = () => (
  <div style={{ margin: '16px', width: 'auto' }}>
    <TagInput />
  </div>
);

export default Page;
