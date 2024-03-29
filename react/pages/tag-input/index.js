import { createContext, useContext, useState } from 'react';

const TagInputContext = createContext();

const isObjEmpty = (object) => Object.keys(object).length === 0;

const Button = ({ tagId }) => {
  const { removeTag } = useContext(TagInputContext);

  return (
    <button onClick={() => removeTag(tagId)} style={{ marginLeft: '4px' }}>
      X
    </button>
  );
};

const Label = ({ children }) => <span>{children}</span>;

const Tag = ({ tagId, tag }) => (
  <span
    style={{ border: '1px solid', padding: '4px', display: 'flex', gap: '6px' }}
  >
    <Label>{tag}</Label>
    <Button tagId={tagId} />
  </span>
);

const Tags = () => {
  const { allTags } = useContext(TagInputContext);

  return (
    <div style={{ display: 'flex', gap: '4px' }}>
      {allTags.map(([tagId, tag]) => (
        <Tag key={tagId} tagId={tagId} tag={tag} />
      ))}
    </div>
  );
};

const Input = () => {
  const [newTag, setNewTag] = useState('');
  const { addTag } = useContext(TagInputContext);

  const updateTag = (event) => {
    setNewTag(event.target.value);
  };

  const handleEnter = (event) => {
    if (event.key === 'Enter') {
      addTag(newTag);
      setNewTag('');
    }
  };

  return <input onChange={updateTag} onKeyDown={handleEnter} value={newTag} />;
};

const Wrapper = ({ children, defaultTags }) => {
  const [tags, setTags] = useState(defaultTags);
  const isEmpty = isObjEmpty(tags);
  const hasGap = !isEmpty;

  const removeTag = (tag) => {
    const { [tag]: _, ...updatedTags } = tags;
    setTags(updatedTags);
  };

  const allTags = Object.entries(tags);
  const hasTag = (tag) => (tags[tag] ? true : false);

  const addTag = (newTag) =>
    !hasTag(newTag) &&
    setTags({
      ...tags,
      [newTag]: newTag,
    });

  const value = {
    allTags,
    addTag,
    removeTag,
  };

  return (
    <TagInputContext.Provider value={value}>
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
    </TagInputContext.Provider>
  );
};

const TagInput = ({ defaultTags }) => (
  <Wrapper defaultTags={defaultTags}>
    <Tags />
    <Input />
  </Wrapper>
);

const defaultTags = { tag1: 'tag1', tag2: 'tag2' };

const Page = () => (
  <div style={{ margin: '16px', width: 'auto' }}>
    <TagInput defaultTags={defaultTags} />
  </div>
);

export default Page;
